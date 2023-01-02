namespace ContosoTraders.Api.Core.Services.Implementations;

internal class StockService : ContosoTradersServiceBase, IStockService
{
    private readonly IStockRepository _stockRepository;

    public StockService(IStockRepository stockRepository, IMapper mapper, IConfiguration configuration, ILogger<StockService> logger) : base(mapper, configuration, logger)
    {
        _stockRepository = stockRepository;
    }

    public async Task<StockDto> GetStockAsync(int productId, CancellationToken cancellationToken = default)
    {
        var requestDto = new StockDto { ProductId = productId, StockCount = 0 };

        var requestDao = Mapper.Map<StockDao>(requestDto);

        var responseDao = await _stockRepository.GetAsync(requestDao.id, requestDao.id, cancellationToken);

        if (responseDao is null) throw new StockNotFoundException(productId);

        var responseDto = Mapper.Map<StockDto>(responseDao);

        return responseDto;
    }

    public async Task<StockDto> DecrementStockCountAsync(int productId, CancellationToken cancellationToken)
    {
        var requestDto = new StockDto { ProductId = productId, StockCount = 0 };

        var requestDao = Mapper.Map<StockDao>(requestDto);

        var responseDao = await _stockRepository.GetAsync(requestDao.id, requestDao.id, cancellationToken);

        if (responseDao is null) throw new StockNotFoundException(productId);

        responseDao.StockCount -= 1;

        await _stockRepository.UpsertAsync(responseDao.id, responseDao, cancellationToken);

        var responseDto = Mapper.Map<StockDto>(responseDao);

        return responseDto;
    }
}