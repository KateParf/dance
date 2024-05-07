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

    [HttpGet("{name?}")]
    public Move Get(string name) {

        //int intId = Int32.Parse(id);
        //d.Id == intId;

        var move = _context.Moves.Where(d => name.Equals(d.Name))
        .Include(d => d.Videos)
        .FirstOrDefault<Move>();
        return move;
    }
}
