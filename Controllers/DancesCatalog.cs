using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DancesCatalogController : ControllerBase
{
    private readonly ILogger<DancesCatalogController> _logger;
    public DancesCatalogController(ILogger<DancesCatalogController> logger)  {
        _logger = logger;
    }

    private static readonly string[] Names = new[]
    {
        "Танец 1", "Танец 2", "Танец 3"
    };

    [HttpGet]
    public IEnumerable<DancesCatalog> Get()
    {
        return Enumerable.Range(0, Names.Length).Select(index => new DancesCatalog
        {
            Id = index,
            Name = Names[index]
        })
        .ToArray();
    }
}
