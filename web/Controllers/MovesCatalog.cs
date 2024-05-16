using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovesCatalogController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<MovesCatalogController> _logger;
    public MovesCatalogController(DanceContext context, ILogger<MovesCatalogController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Move> Get()
    {
        var moves = _context.Moves
//        .Include(d => d.Epoch)
//        .Include(d => d.Level)
//        .Include(d => d.Type)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);
        .ToArray<Move>();

        return moves;
    }
}
