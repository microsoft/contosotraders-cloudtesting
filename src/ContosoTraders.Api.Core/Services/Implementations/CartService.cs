namespace ContosoTraders.Api.Core.Services.Implementations;

internal class CartService : ContosoTradersServiceBase, ICartService
{
    private readonly ICartRepository _cartRepository;

    public CartService(ICartRepository cartRepository, IMapper mapper, IConfiguration configuration, ILogger<CartService> logger) : base(mapper, configuration, logger)
    {
        _cartRepository = cartRepository;
    }

    public async Task<IEnumerable<CartDto>> GetCartAsync(string email, CancellationToken cancellationToken = default)
    {
        var filterClause = $"LOWER(c.Email) = '{email.ToLower()}'";

        var cartItemDaos = await _cartRepository.ListAsync(filterClause, cancellationToken);

        if (!cartItemDaos.Any()) throw new CartNotFoundException(email);

        var cartItemDtos = cartItemDaos.Select(item => Mapper.Map<CartDto>(item)).ToList();

        return cartItemDtos;
    }

    public async Task AddItemToCartAsync(CartDto cartItemDto, CancellationToken cancellationToken = default)
    {
        var cartItemDao = Mapper.Map<CartDao>(cartItemDto);
        cartItemDao.id = Guid.NewGuid().ToString();

        await _cartRepository.AddAsync(cartItemDao.Email, cartItemDao, cancellationToken);
    }

    public async Task UpdateCartItemQuantityAsync(CartDto cartItemDto, CancellationToken cancellationToken = default)
    {
        var cartItemDao = Mapper.Map<CartDao>(cartItemDto);

        await _cartRepository.UpsertAsync(cartItemDao.Email, cartItemDao, cancellationToken);
    }

    public async Task RemoveItemFromCartAsync(CartDto cartItemDto, CancellationToken cancellationToken = default)
    {
        var cartItemDao = Mapper.Map<CartDao>(cartItemDto);

        await _cartRepository.DeleteAsync(cartItemDao.Email, cartItemDao.id, cancellationToken);
    }
}