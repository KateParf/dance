using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class DanceController : ControllerBase {
    private readonly DanceContext _context;

    private readonly ILogger<DanceController> _logger;

    public DanceController(DanceContext context, ILogger<DanceController> logger) {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{id?}")]
    public Dance Get(string id) {
        int intId = Int32.Parse(id);

        var dance = _context.Dances.Where(d => d.Id == intId)
        .Include(d => d.Epoch)
        .Include(d => d.Level)
        .Include(d => d.Type)
        .Include(d => d.Videos)
        .Include(d => d.Music)
        .FirstOrDefault<Dance>();
        return dance;
    }
}
