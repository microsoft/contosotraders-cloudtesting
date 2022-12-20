namespace ContosoTraders.Api.Core.Models.Implementations.Dao;

public class Feature
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int? ProductItemId { get; set; }
}