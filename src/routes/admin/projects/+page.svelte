<script>
    import PageHeader from "$lib/PageHeader.svelte";

    export let data;
</script>

<PageHeader title="Manage Projects" subtitle="Create/read/update/delete projects on this site"/>

<div class="ct">
    <!--    "Create new project" button -->
    <div class="flex justify-end">
        <label for="create-modal" class="btn btn-primary">Create new project</label>
    </div>

    <!--    Create new project modal -->
    <input type="checkbox" id="create-modal" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box space-y-4">
            <label for="create-modal">
                <button type="submit" form="create-form" class="btn btn-primary">Create</button>
            </label>
            <label for="create-modal" class="btn btn-secondary">Cancel</label>
        </div>
    </div>

    <!--    Data table -->
    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each data.projects as project}
                <!--Table entry-->
                <tr>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>
                        <!--                        Show checkmark if published, x if not-->
                        {#if project.published === true}
                            ✔
                        {:else}
                            ❌
                        {/if}
                    </td>
                    <td>{project.createdAt}</td>
                    <td>
                        <!--                        Buttons to trigger the edit/delete modals -->
                        <label for="edit-modal-{project.id}" class="btn btn-sm btn-primary">
                            Edit
                        </label>
                        <label for="delete-confirm-modal-{project.id}" class="btn btn-sm btn-error">
                            Delete
                        </label>
                    </td>
                </tr>

                <!--                Editing handler-->
                <!--                Modal to edit item -->
                <input type="checkbox" id="edit-modal-{project.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <label for="edit-modal-{project.id}">
                            <button type="submit" form="delete-form-{project.id}" class="btn btn-primary">Edit
                            </button>
                        </label>
                        <label for="edit-modal-{project.id}" class="btn btn-secondary">Cancel</label>
                    </div>
                </div>

                <!--                Deletion handler-->
                <!--                Modal to confirm whether user wants to delete item -->
                <input type="checkbox" id="delete-confirm-modal-{project.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <p>Are you sure you want to delete this project "{project.name}"?</p>
                        <div class="modal-buttons">
                            <label for="delete-confirm-modal-{project.id}">
                                <button type="submit" form="delete-form-{project.id}" class="btn btn-primary">Yes
                                </button>
                            </label>
                            <label for="delete-confirm-modal-{project.id}" class="btn btn-error">No</label>
                        </div>
                    </div>
                </div>
                <!--                Form to store data to be sent when the delete confirm button is clicked -->
                <form action="" method="post" id="delete-form-{project.id}">
                    <input type="hidden" name="id" value="{project.id}"/>
                    <input type="hidden" name="action" value="delete"/>
                </form>

            {/each}
            </tbody>
        </table>
    </div>
</div>