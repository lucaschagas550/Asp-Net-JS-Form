namespace Forms.Models
{
    public class ErroListaApi
    {
        public List<string> Erros { get; set; } = new List<string>();

        public void LimparErros() =>
            Erros.Clear();
    }
}
