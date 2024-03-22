using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoveController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<MoveController> _logger;
    public MoveController(DanceContext context, ILogger<MoveController> logger) {
        _logger = logger;
        _context = context;
    }

    [HttpGet("{id?}")]
    public Move Get(string id) {

        int intId = Int32.Parse(id);

        var move = _context.Moves.Where(d => d.Id == intId)
        .Include(d => d.Videos)
        .FirstOrDefault<Move>();
        return move;
    }
}
