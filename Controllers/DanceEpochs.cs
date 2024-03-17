using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceEpochsController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<DanceEpochsController> _logger;
    public DanceEpochsController(DanceContext context, ILogger<DanceEpochsController> logger)  {
        _logger = logger;
        _context = context;
    }


    [HttpGet]
    public IEnumerable<DanceEpoch> Get()
    {
        var danceEpochs = _context.DanceEpochs.ToArray<DanceEpoch>();
//        .Include(s => s.Enrollments)
//        .ThenInclude(e => e.Course)
//        .AsNoTracking()
//        .FirstOrDefaultAsync(m => m.ID == id);

        return danceEpochs;
    }
}
