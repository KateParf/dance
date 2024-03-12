using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceLevelsController : ControllerBase
{
    private readonly ILogger<DanceLevelsController> _logger;
    public DanceLevelsController(ILogger<DanceLevelsController> logger) {
        _logger = logger;
    }

    private static readonly string[] Names = new[]
    {
        "Легкие", "Средние", "Сложные"
    };

    [HttpGet]
    public IEnumerable<DanceLevel> Get()
    {
        return Enumerable.Range(0, Names.Length).Select(index => new DanceLevel
        {
            Id = index,
            Name = Names[index]
        })
        .ToArray();
    }
}
