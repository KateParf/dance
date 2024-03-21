using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DancesController : ControllerBase {

    private readonly DanceContext _context;

    private readonly ILogger<DancesController> _logger;

    public DancesController(DanceContext context, ILogger<DancesController> logger)  {
        _logger = logger;
        _context = context;
    }
  
    [HttpGet]
    public IEnumerable<Dance> Get()  {

        var dances = _context.Dances
        .Include(d => d.Epoch)
        .Include(d => d.Level)
        .Include(d => d.Type)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);
        .ToArray<Dance>();

        return dances;
    }
}
