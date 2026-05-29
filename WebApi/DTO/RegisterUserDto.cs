using System.ComponentModel.DataAnnotations;

namespace WebApi.DTO;

public class RegisterUserDto
{
    [Required]
    [MaxLength(100)]
    public string Nom { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Prenom { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Adresse { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Telephone { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Ville { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Pays { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}
