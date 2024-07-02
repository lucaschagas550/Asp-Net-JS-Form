//Alterar a action do form conforme o botao que eh ativo
document.getElementById('btnSaveCreate').addEventListener('click', function () {
    console.log('salvar');
    document.getElementById('mainForm').action = '/Pedido/Create';
    document.getElementById('mainForm').submit();
});

document.getElementById('btnSaveUpdate').addEventListener('click', function () {
    console.log('update');
    document.getElementById('mainForm').action = '/Pedido/update';
    document.getElementById('mainForm').submit();
});

document.getElementById('btnSaveDelete').addEventListener('click', function () {
    document.getElementById('mainForm').action = '/Pedido/Delete';
    document.getElementById('mainForm').submit();
});