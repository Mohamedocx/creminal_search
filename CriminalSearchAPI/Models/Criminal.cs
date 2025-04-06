using System;
using System.ComponentModel.DataAnnotations;

public class Criminal
{

    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string CaseNumber { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public string BirthPlace { get; set; }

    [Required]
    public string NationalId { get; set; }

    [Required]
    public string Nationality { get; set; }

    [Required]
    public string Tribe { get; set; }

    [Required]
    public string PersonalDescription { get; set; }

    [Required]
    public string SpecialFeatures { get; set; }

    [Required]
    public string PermanentResidence { get; set; }

    [Required]
    public string UsualPlaces { get; set; }

    [Required]
    public string CrimeType { get; set; }

    [Required]
    public string CrimeLocation { get; set; }


    public string ImagePath { get; set; }
}


