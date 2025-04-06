using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ تحميل إعدادات JWT من `appsettings.json`
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];
var jwtKey = builder.Configuration["Jwt:Key"];

// ✅ التأكد من عدم وجود قيم فارغة في JWT
if (string.IsNullOrEmpty(jwtKey))
{
    throw new ArgumentNullException("Jwt:Key", "🔴 خطأ: لم يتم العثور على مفتاح JWT في appsettings.json!");
}

// ✅ إضافة خدمات المصادقة باستخدام JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// ✅ إضافة قاعدة البيانات SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ تفعيل CORS للسماح لـ React بالتواصل مع API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// ✅ إضافة الخدمات الأخرى
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ تفعيل CORS
app.UseCors("AllowReactApp");

// ✅ عرض الأخطاء أثناء التطوير
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}


// ✅ تفعيل المصادقة والصلاحيات
app.UseAuthentication();
app.UseAuthorization();

// ✅ تفعيل Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.UseStaticFiles();
app.Run();
