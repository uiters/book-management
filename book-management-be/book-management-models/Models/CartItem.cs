namespace book_management_models
{
    public class CartItem : BaseModel
    {
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int Quantity { get; set; }
    }
}