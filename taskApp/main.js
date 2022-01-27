$(document).ready(function(){
    let edit = false;
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
            description: $('#description').val(),
            id: $('#taskId').val()
        };
        e.preventDefault();

        let url = edit === false ? 'taskAdd.php' : 'taskUpdate.php'
        
        $.post(url, postData, function(response){
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
                        <tr  taskId ="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href = "#" class = "task-item ">${task.name}</a>
                            </td>
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
        if(confirm('Are you sure you want to delete it?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('taskDelete.php', {id}, function(response){
                fetchTasks();
            });
        }

    })

    $(document).on('click', '.task-item', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('taskSingle.php', {id}, function(response){
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
            fetchTasks();
        })
    })
})