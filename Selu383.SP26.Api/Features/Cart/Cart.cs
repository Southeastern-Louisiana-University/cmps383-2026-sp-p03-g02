using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Cart
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsOrdered { get; set; }
        public decimal Total { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual ICollection<CartItem> CartItem { get; set; } = new List<CartItem>();
    }
}
