[X] Implemente a integração com a API do GitHub para captura de commits dos repositórios adicionados pelo formulário.
[X] Implemente validação de existência do repositório adicionado na sua conta do GitHub.
[X] Implemente a captura dos commits dos últimos 30 dias do repositório adicionado. Armazene-os no banco de dados.
[X] Os endpoints de commit e repositório foram implementados usando function based views. Refatore estes endpoints para que usem generic Class Based Views do Django REST Framework.
[X] Implemente paginação no endpoint de listagem considerando 10 itens por página.
[ ] Implemente filtragem por repositório e autor do commit no endpoint de listagem. Utilize o django-filter.
[ ] Implemente a paginação e filtros no frontend, usando as alterações feitas no backend, no requisito anterior.
[ ] Para as filtragens, considere que dentro da listagem de commits, deverá ser possível clicar no nome do repositório ou autor e isso levará para uma nova página onde apenas os commits com esses critérios são exibidos.
[ ] Deve ser possível navegar pelos repositórios com uma barra lateral onde estão listados todos repositórios.
