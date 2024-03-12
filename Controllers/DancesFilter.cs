using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceFilterController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<DanceFilterController> _logger;

    public DanceFilterController(ILogger<DanceFilterController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Dance> Get()
    {
        return Enumerable.Range(1, 15).Select(index => new Dance
        {
            Id = index,
            Name = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
