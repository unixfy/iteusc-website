<script>
    import PageHeader from "$lib/PageHeader.svelte";

    export let form;

    export let data;
</script>

<PageHeader title="Manage Projects" subtitle="Create/read/update/delete projects on this site"/>

<div class="ct">
    <!--    Success/failure messages -->
    {#if form?.success}
        <div class="alert alert-success my-8">
            <div>
                <span class="font-bold">Success! </span> Your action succeeded.
            </div>
        </div>
    {/if}
    {#if form?.error}
        <div class="alert alert-error my-8">
            <div>
                <span class="font-bold">Error! </span> Your action failed: {form?.error}
            </div>
        </div>
    {/if}

    <!--    "Create new project" button -->
    <div class="flex justify-end">
        <label for="create-modal" class="btn btn-primary mb-4">Create new project</label>
    </div>

    <!--    Create new project modal -->
    <input type="checkbox" id="create-modal" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box space-y-4">
            <form class="flex flex-col space-y-4" id="create-form" action="?/create" method="post">
                <!--                Title -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Title</span>
                        <span class="label-text-alt">A title for this project</span>
                    </label>
                    <input type="text" name="title" placeholder="Type here" class="input input-bordered w-full"
                           required/>
                </div>
                <!--                Description -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Description</span>
                        <span class="label-text-alt">A description for this project</span>
                    </label>
                    <input type="text" name="description" placeholder="Type here" class="input input-bordered w-full"
                           required/>
                </div>

                <!--                Upload associated image -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Pick a header image</span>
                        <span class="label-text-alt">Ideally 16:9, must be an image</span>
                    </label>
                    <input type="file" name="imageFile" class="file-input file-input-bordered w-full" accept="image/*"
                           required/>
                </div>

                <!--                Published? -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Published?</span>
                        <input type="checkbox" class="toggle" name="published" value="true" checked/>
                    </label>
                </div>
            </form>

            <label for="create-modal">
                <button type="submit" form="create-form" class="btn btn-primary">Create
                </button>
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
                        <form class="flex flex-col space-y-4" id="edit-form-{project.id}" action="?/edit" method="post">
                            <!--                Title -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Title</span>
                                    <span class="label-text-alt">A title for this project</span>
                                </label>
                                <input type="text" name="title" value="{project.name}"
                                       class="input input-bordered w-full" required/>
                            </div>
                            <!--                Description -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Description</span>
                                    <span class="label-text-alt">A description for this project</span>
                                </label>
                                <input type="text" name="description" value="{project.description}"
                                       class="input input-bordered w-full" required/>
                            </div>

                            <!--                Published? -->
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Published?</span>
                                    <input type="checkbox" class="toggle" name="published" value="true"
                                           bind:checked="{project.published}"/>
                                </label>
                            </div>

                            <!--                            Hidden input to store the item ID -->
                            <input type="hidden" name="id" value="{project.id}"/>
                        </form>

                        <label for="edit-modal-{project.id}">
                            <button type="submit" form="edit-form-{project.id}" class="btn btn-primary">Edit
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
                <!--                Form to store deletion data -->
                <form action="?/delete" method="post" id="delete-form-{project.id}">
                    <input type="hidden" name="id" value="{project.id}"/>
                </form>

            {/each}
            </tbody>
        </table>
    </div>
</div>