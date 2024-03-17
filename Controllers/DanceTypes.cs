using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceTypesController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<DanceTypesController> _logger;
    public DanceTypesController(DanceContext context, ILogger<DanceTypesController> logger) {
        _logger = logger;
        _context = context;
    }


    [HttpGet]
    public IEnumerable<DanceType> Get()
    {
        var danceTypes = _context.DanceType.ToArray<DanceType>();
//        .Include(s => s.Enrollments)
//        .ThenInclude(e => e.Course)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);

        return danceTypes;
    }
}
