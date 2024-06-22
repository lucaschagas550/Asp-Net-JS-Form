namespace Forms.ViewModels
{
    public class LojasDisponiveisViewModel
    {
        public string Nome { get; set; } = string.Empty;
        public string Cep { get; set; } = string.Empty;
        public int Numero { get; set; }

        public LojasDisponiveisViewModel()
        {
            
        }

        public LojasDisponiveisViewModel(string nome, string cep, int numero)
        {
            Nome=nome;
            Cep=cep;
            Numero=numero;
        }
    }
}
