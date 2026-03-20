using Microsoft.AspNetCore.Mvc;
using EvaluateSatisfaction.API.Models;

namespace EvaluateSatisfaction.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EvaluationsController : ControllerBase
{
    private static readonly List<SatisfactionEvaluation> _evaluations = new();
    private static int _nextId = 1;

    [HttpGet]
    public ActionResult<IEnumerable<SatisfactionEvaluation>> Get()
    {
        return Ok(_evaluations);
    }

    [HttpPost]
    public ActionResult<SatisfactionEvaluation> Post([FromBody] SatisfactionEvaluation evaluation)
    {
        evaluation.Id = _nextId++;
        evaluation.CreatedAt = DateTime.UtcNow;
        _evaluations.Add(evaluation);
        
        return CreatedAtAction(nameof(Get), new { id = evaluation.Id }, evaluation);
    }
}
