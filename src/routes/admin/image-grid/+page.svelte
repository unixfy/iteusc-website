<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {format, parseISO} from "date-fns";
    import {getStorageDirectUrl} from "$lib/firebase/getStorageDirectUrl.js";

    export let form;

    export let data;
</script>

<PageHeader title="Manage Image Grid" subtitle="Update homepage image grid"/>

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

    <div class="flex justify-between mb-4">
        <!--            Return to admin page button -->
        <a href="/admin" class="btn btn-primary">Back to admin</a>
        <!--Create new button -->
        <label for="create-modal" class="btn btn-primary">Add new image grid item</label>
    </div>

    <!--    Add new grid item modal -->
    <input type="checkbox" id="create-modal" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box space-y-4">
            <!--            MUST be encoded as multipart/form-data for the file upload to actually work  -->
            <form class="flex flex-col space-y-4" id="create-form" action="?/create" method="post"
                  enctype="multipart/form-data">
                <!--                Name -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name</span>
                        <span class="label-text-alt">A description for this image</span>
                    </label>
                    <input type="text" name="name" placeholder="Esri Redlands campus tour"
                           class="input input-bordered w-full" maxlength="100"
                           required/>
                </div>

                <!--                Order -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Order</span>
                        <span class="label-text-alt">Order that this grid item should display in</span>
                    </label>
                    <input type="number" name="order" placeholder="0"
                           class="input input-bordered w-full"
                           required min="0" max="50"/>
                    <label class="label">
                        <span class="label-text">Smaller numbers display first</span>
                    </label>
                </div>

                <!--                Upload associated image -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Grid item image</span>
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
                <button type="submit" form="create-form" class="btn btn-primary">Add
                </button>
            </label>
            <label for="create-modal" class="btn btn-secondary">Cancel</label>
        </div>
    </div>

    <!--    Warning about image grid functionality -->
    <div class="alert alert-info my-4 text-white">
        <p>
            <span class="font-bold">The image grid on the homepage only displays the first 6 items here.</span>
            You can have other items here, but they won't be displayed on the homepage.
        </p>
    </div>
    <!--    Data table -->
    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
            <tr>
                <th>Name</th>
                <th>Order</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each data.items as item}
                <!--Table entry-->
                <tr>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td>
                        <!--                        Show checkmark if published, x if not-->
                        {#if item.published === true}
                            ✔
                        {:else}
                            ❌
                        {/if}
                    </td>
                    <td>{format(parseISO(item.createdAt), "Pp")}</td>
                    <td>{format(parseISO(item.updatedAt), "Pp")}</td>
                    <td>
                        <!--                        Buttons to trigger the edit/delete modals -->
                        <label for="edit-modal-{item.id}" class="btn btn-sm btn-primary">
                            Edit
                        </label>
                        <label for="delete-confirm-modal-{item.id}" class="btn btn-sm btn-error">
                            Delete
                        </label>
                    </td>
                </tr>

                <!--                Editing handler-->
                <!--                Modal to edit item -->
                <input type="checkbox" id="edit-modal-{item.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <!--                        Image -->
                        <img src="{getStorageDirectUrl(item.image)}" alt="Image for {item.name}"
                             class="w-full rounded-lg shadow-md"/>

                        <form class="flex flex-col space-y-4" id="edit-form-{item.id}" action="?/edit" method="post">
                            <!--                Name -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                    <span class="label-text-alt">Grid item's name</span>
                                </label>
                                <input type="text" name="name" placeholder="Esri Redlands campus tour"
                                       class="input input-bordered w-full" value="{item.name}"
                                       required/>
                            </div>

                            <!--                Order -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Order</span>
                                    <span class="label-text-alt">Order that this grid item should display in</span>
                                </label>
                                <input type="number" name="order" placeholder="0"
                                       class="input input-bordered w-full" value="{item.order}"
                                       required min="0" max="50"/>
                                <label class="label">
                                    <span class="label-text">Smaller numbers display first</span>
                                </label>
                            </div>

                            <!--                Published? -->
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Published?</span>
                                    <input type="checkbox" class="toggle" name="published" value="true" checked/>
                                </label>
                            </div>

                            <!--                            Hidden input to store the item ID -->
                            <input type="hidden" name="id" value="{item.id}"/>
                        </form>

                        <label for="edit-modal-{item.id}">
                            <button type="submit" form="edit-form-{item.id}" class="btn btn-primary">Edit
                            </button>
                        </label>
                        <label for="edit-modal-{item.id}" class="btn btn-secondary">Cancel</label>
                    </div>
                </div>

                <!--                Deletion handler-->
                <!--                Modal to confirm whether user wants to delete item -->
                <input type="checkbox" id="delete-confirm-modal-{item.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <p>Are you sure you want to delete this grid item "{item.name}"?</p>
                        <div class="modal-buttons">
                            <label for="delete-confirm-modal-{item.id}">
                                <button type="submit" form="delete-form-{item.id}" class="btn btn-primary">Yes
                                </button>
                            </label>
                            <label for="delete-confirm-modal-{item.id}" class="btn btn-error">No</label>
                        </div>
                    </div>
                </div>
                <!--                Form to store deletion data -->
                <form action="?/delete" method="post" id="delete-form-{item.id}">
                    <input type="hidden" name="id" value="{item.id}"/>
                </form>

            {/each}
            </tbody>
        </table>
    </div>
</div>