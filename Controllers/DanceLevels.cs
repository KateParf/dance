using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceLevelsController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<DanceLevelsController> _logger;
    public DanceLevelsController(DanceContext context, ILogger<DanceLevelsController> logger) {
        _logger = logger;
        _context = context;
    }


    [HttpGet]
    public IEnumerable<DanceLevel> Get()
    {
        var danceLevels = _context.DanceLevel.ToArray<DanceLevel>();
//        .Include(s => s.Enrollments)
//        .ThenInclude(e => e.Course)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);

        return danceLevels;
    }
}
