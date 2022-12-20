namespace ContosoTraders.Api.Core.Models.Interfaces;

public interface ICosmosDao<T>
{
    // ReSharper disable once InconsistentNaming
#pragma warning disable IDE1006 // Naming Styles
    public T id { get; set; }
#pragma warning restore IDE1006 // Naming Styles
}