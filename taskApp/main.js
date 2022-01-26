$(document).ready(function(){
    fetchTasks();
    $('#task-result').hide();
    $('#search').keyup(function(){
        if ($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url:'taskSearch.php',
                type: 'POST',
                data: {search: search},
                success: function(response){
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach( task =>{
                        template += `<li>
                            ${task.name}
                        </li>`
                    });

                    $('#container').html(template);
                    $('#task-result').show();

                }
            })
        }
    });

    $('#task-form').submit(function(e){
        const postData = {
            name: $('#name').val(),
            description: $('#description').val()
        };
        e.preventDefault();
        $.post('taskAdd.php', postData, function(response){
            fetchTasks();
            $('#task-form').trigger('reset');

        })
    });

    function fetchTasks(){
        $.ajax({
            url: 'tasklist.php',
            type: 'GET',
            success: function(response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach( task =>{
                    template += `
                        <tr>
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>
                                <button class = "task-delete btn btn-danger" > DELETE </button>
                            </td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
               
                
            }
        });
    }

    $(document).on('click', '.task-delete', function(){
        let element = $(this)[0].parentElement.parentElement;
        console.log(element)

    })
})