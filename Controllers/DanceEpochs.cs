using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceEpochsController : ControllerBase
{
    private readonly ILogger<DanceEpochsController> _logger;
    public DanceEpochsController(ILogger<DanceEpochsController> logger)  {
        _logger = logger;
    }

    private static readonly string[] Names = new[]
    {
        "Средние века", "18 век", "19 век", "20 век", "21 век"
    };

    [HttpGet]
    public IEnumerable<DanceEpoch> Get()
    {
        return Enumerable.Range(0, Names.Length).Select(index => new DanceEpoch
        {
            Id = index,
            Name = Names[index]
        })
        .ToArray();
    }
}
