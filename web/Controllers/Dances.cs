using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DancesController : ControllerBase
{

    private readonly DanceContext _context;

    private readonly ILogger<DancesController> _logger;

    public DancesController(DanceContext context, ILogger<DancesController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Dance> Get(string? filterType, string? filterLevel, string? filterEpoch, string? filterPartnerExchYes, string? filterPartnerExchNo, string? filterCountOfPartners, string? filterSearch)
    {

        var dances = _context.Dances
        .Include(d => d.Epoch)
        .Include(d => d.Level)
        .Include(d => d.Type)
        .Where(d => filterType == null || (d.Type.Id == Int32.Parse(filterType)))
        .Where(d => filterLevel == null || (d.Level.Id == Int32.Parse(filterLevel)))
        .Where(d => filterEpoch == null || (d.Epoch.Id == Int32.Parse(filterEpoch)))
        .Where(d =>
        ((filterPartnerExchYes == null) && (filterPartnerExchNo == null)) ||
        ((filterPartnerExchYes == "true" && (d.ChangePartner == true))) ||
        ((filterPartnerExchNo == "true" && (d.ChangePartner == false))))
        .Where(d => filterCountOfPartners == null || (d.CountOfPairs == Int32.Parse(filterCountOfPartners)))
        .Where(d => filterSearch == null || d.Name.ToLower().Contains(filterSearch.ToLower()))

        //        .AsNoTracking()
        //        .FirstOrDefaultAsync(m => m.ID == id);

        .ToArray<Dance>();

        return dances;
    }
}

public class Filter
{
    public int? filterType;
    public int? filterEpoch;
    public int? filterLevel;
    public bool? filterPartnerExchYes;
    public bool? filterPartnerExchNo;
    public int? filterCountOfPartners;
    public string? filterSearch;
}
