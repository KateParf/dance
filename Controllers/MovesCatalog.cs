using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovesCatalogController : ControllerBase
{
    private readonly ILogger<MovesCatalogController> _logger;
    public MovesCatalogController(ILogger<MovesCatalogController> logger)  {
        _logger = logger;
    }

    private static readonly string[] Names = new[]
    {
        "Движение 1", "Движение 2", "Движение 3", "Движение 4", "Движение 5"
    };

    [HttpGet]
    public IEnumerable<MovesCatalog> Get()
    {
        return Enumerable.Range(0, Names.Length).Select(index => new MovesCatalog
        {
            Id = index,
            Name = Names[index]
        })
        .ToArray();
    }
}
