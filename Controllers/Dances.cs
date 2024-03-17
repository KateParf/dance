using Microsoft.AspNetCore.Mvc;
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

        var dances = _context.Dances.ToArray<Dance>();
//        .Include(s => s.Enrollments)
//        .ThenInclude(e => e.Course)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);

        return dances;
    }
}
