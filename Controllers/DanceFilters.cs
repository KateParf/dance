using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceFilterController : ControllerBase
{


    private readonly ILogger<DanceFilterController> _logger;

    public DanceFilterController(ILogger<DanceFilterController> logger)
    {
        _logger = logger;
    }
    private static readonly string[] FilterTypes = new[]
    {
        "Направление", "Период", "Сложность", "С переходом", "Количество пар"
    };

    [HttpGet]
    public IEnumerable<DanceFilter> Get()
    {
        return Enumerable.Range(0, FilterTypes.Length).Select(index => new DanceFilter
        {
            Id = index,
            Name = FilterTypes[index]
        })
        .ToArray();
    }
}
