using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class User
{
    public int Id { get; set; }

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
    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
