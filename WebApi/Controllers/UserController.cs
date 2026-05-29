using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.DTO;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IPasswordService _passwordService;

    public UserController(AppDbContext context, IPasswordService passwordService)
    {
        _context = context;
        _passwordService = passwordService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserDto dto)
    {
        bool emailExists = await _context.Users.AnyAsync(user => user.Email == dto.Email);
        if (emailExists)
        {
            return Conflict(new { message = "Cet email est deja utilise." });
        }

        var user = new User
        {
            Nom = dto.Nom,
            Prenom = dto.Prenom,
            Email = dto.Email,
            Adresse = dto.Adresse,
            Telephone = dto.Telephone,
            Ville = dto.Ville,
            Pays = dto.Pays,
            PasswordHash = _passwordService.HashPassword(dto.Password),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = user.Id }, ToResponse(user));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(item => item.Email == dto.Email);
        if (user is null || !_passwordService.VerifyPassword(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Email ou mot de passe incorrect." });
        }

        return Ok(new
        {
            message = "Connexion reussie.",
            user = ToResponse(user),
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _context.Users
            .AsNoTracking()
            .OrderBy(user => user.Id)
            .Select(user => ToResponse(user))
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
        if (user is null)
        {
            return NotFound(new { message = "Utilisateur introuvable." });
        }

        return Ok(ToResponse(user));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(item => item.Id == id);
        if (user is null)
        {
            return NotFound(new { message = "Utilisateur introuvable." });
        }

        bool emailExists = await _context.Users.AnyAsync(item => item.Email == dto.Email && item.Id != id);
        if (emailExists)
        {
            return Conflict(new { message = "Cet email est deja utilise." });
        }

        user.Nom = dto.Nom;
        user.Prenom = dto.Prenom;
        user.Email = dto.Email;
        user.Adresse = dto.Adresse;
        user.Telephone = dto.Telephone;
        user.Ville = dto.Ville;
        user.Pays = dto.Pays;

        await _context.SaveChangesAsync();

        return Ok(ToResponse(user));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(item => item.Id == id);
        if (user is null)
        {
            return NotFound(new { message = "Utilisateur introuvable." });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static object ToResponse(User user)
    {
        return new
        {
            user.Id,
            user.Nom,
            user.Prenom,
            user.Email,
            user.Adresse,
            user.Telephone,
            user.Ville,
            user.Pays,
            user.CreatedAt,
        };
    }
}
