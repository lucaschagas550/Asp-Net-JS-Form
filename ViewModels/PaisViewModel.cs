namespace Forms.ViewModels
{
    public class PaisViewModel
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public PaisViewModel()
        {
            
        }

        public PaisViewModel(int id, string nome)
        {
            Id=id;
            Nome=nome;
        }
    }
}
