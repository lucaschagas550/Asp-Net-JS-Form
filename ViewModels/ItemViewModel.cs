using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Forms.ViewModels
{
    public class ItemViewModel
    {
        public string Descricao { get; set; }
        public int Quantidade { get; set; }
        public decimal Preco { get; set; }

        public DateTime? Data { get; set; }
        public bool Desconto { get; set; }
        public int PaisId { get; set; }
        public SelectList ItemValueSelectList { get; set; }
        public SelectList ItemTextSelectList { get; set; }
    }
}
