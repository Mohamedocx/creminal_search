using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.IO;

[Route("api/[controller]")]
[ApiController]
public class CriminalsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public CriminalsController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // Get all criminals
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _context.Criminals.ToListAsync());

    // Get criminal by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var criminal = await _context.Criminals.FindAsync(id);
        return criminal == null ? NotFound() : Ok(criminal);
    }

    // Add new criminal with optional image
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Criminal criminal, IFormFile image)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        await HandleImageUpload(criminal, image);

        _context.Criminals.Add(criminal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = criminal.Id }, criminal);
    }

    // Update criminal with optional image
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] Criminal updatedCriminal, IFormFile image)
    {
        if (id != updatedCriminal.Id) return BadRequest("ID mismatch");
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var existingCriminal = await _context.Criminals.FindAsync(id);
        if (existingCriminal == null) return NotFound();

        await HandleImageUpload(updatedCriminal, image);

        _context.Entry(existingCriminal).CurrentValues.SetValues(updatedCriminal);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Delete criminal
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var criminal = await _context.Criminals.FindAsync(id);
        if (criminal == null) return NotFound();

        // Optionally delete the associated image file
        if (!string.IsNullOrEmpty(criminal.ImagePath))
        {
            var filePath = Path.Combine(_env.WebRootPath, criminal.ImagePath.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.Criminals.Remove(criminal);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Search criminals
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return BadRequest("Search query is required");

        var searchPattern = $"%{query}%";

        var criminals = await _context.Criminals
            .AsNoTracking()
            .Where(c => EF.Functions.Like(c.Name, searchPattern) ||
                        EF.Functions.Like(c.NationalId, searchPattern) ||
                        EF.Functions.Like(c.Tribe, searchPattern) ||
                        EF.Functions.Like(c.CrimeType, searchPattern) ||
                        EF.Functions.Like(c.CrimeLocation, searchPattern))
            .Take(50)
            .ToListAsync();

        return Ok(criminals);
    }

    private async Task HandleImageUpload(Criminal criminal, IFormFile image)
    {
        if (image == null || image.Length == 0) return;

        // Create images directory if it doesn't exist
        var imagesPath = Path.Combine(_env.WebRootPath, "images");
        if (!Directory.Exists(imagesPath))
            Directory.CreateDirectory(imagesPath);

        // Generate unique filename
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
        var filePath = Path.Combine(imagesPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        criminal.ImagePath = $"/images/{fileName}";
    }
}