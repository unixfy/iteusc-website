<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {format, parseISO} from "date-fns";

    export let form;

    export let data;
</script>

<PageHeader title="Manage Team Members" subtitle="Update team members on this site"/>

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
        <label for="create-modal" class="btn btn-primary">Add new team member</label>
    </div>

    <!--    Add new team member modal -->
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
                        <span class="label-text-alt">Team member's name</span>
                    </label>
                    <input type="text" name="name" placeholder="John Doe" class="input input-bordered w-full"
                           required/>
                </div>
                <!--                Role -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Role</span>
                        <span class="label-text-alt">Team member's role</span>
                    </label>
                    <input type="text" name="role" placeholder="President" class="input input-bordered w-full"
                           required/>
                </div>

                <!--                Hometown -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Hometown</span>
                        <span class="label-text-alt">Where team member is from</span>
                    </label>
                    <input type="text" name="hometown" placeholder="New York, NY" class="input input-bordered w-full"
                           required/>
                </div>

                <!--                Major -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Major</span>
                        <span class="label-text-alt">Team member's major</span>
                    </label>
                    <input type="text" name="major" placeholder="BS Industrial and Systems Engineering"
                           class="input input-bordered w-full"
                           required/>
                </div>

                <!--                Order -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Order</span>
                        <span class="label-text-alt">Order that this team member should display in</span>
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
                        <span class="label-text">Team member headshot</span>
                        <span class="label-text-alt">Ideally 1:1 (square), must be an image</span>
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

    <!--    Data table -->
    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Major</th>
                <th>Hometown</th>
                <th>Order</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each data.members as member}
                <!--Table entry-->
                <tr>
                    <td class="text-xs">{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.major}</td>
                    <td>{member.hometown}</td>
                    <td>{member.order}</td>
                    <td>
                        <!--                        Show checkmark if published, x if not-->
                        {#if member.published === true}
                            ✔
                        {:else}
                            ❌
                        {/if}
                    </td>
                    <td>{format(parseISO(member.createdAt), "Pp")}</td>
                    <td>
                        <!--                        Buttons to trigger the edit/delete modals -->
                        <label for="edit-modal-{member.id}" class="btn btn-sm btn-primary">
                            Edit
                        </label>
                        <label for="delete-confirm-modal-{member.id}" class="btn btn-sm btn-error">
                            Delete
                        </label>
                    </td>
                </tr>

                <!--                Editing handler-->
                <!--                Modal to edit item -->
                <input type="checkbox" id="edit-modal-{member.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <form class="flex flex-col space-y-4" id="edit-form-{member.id}" action="?/edit" method="post">
                            <!--                Name -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                    <span class="label-text-alt">Team member's name</span>
                                </label>
                                <input type="text" name="name" placeholder="John Doe"
                                       class="input input-bordered w-full" value="{member.name}"
                                       required/>
                            </div>
                            <!--                Role -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Role</span>
                                    <span class="label-text-alt">Team member's role</span>
                                </label>
                                <input type="text" name="role" placeholder="President"
                                       class="input input-bordered w-full" value="{member.role}"
                                       required/>
                            </div>

                            <!--                Hometown -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Hometown</span>
                                    <span class="label-text-alt">Where team member is from</span>
                                </label>
                                <input type="text" name="hometown" placeholder="New York, NY"
                                       class="input input-bordered w-full" value="{member.hometown}"
                                       required/>
                            </div>

                            <!--                Major -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Major</span>
                                    <span class="label-text-alt">Team member's major</span>
                                </label>
                                <input type="text" name="major" placeholder="BS Industrial and Systems Engineering"
                                       class="input input-bordered w-full" value="{member.major}"
                                       required/>
                            </div>

                            <!--                Order -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Order</span>
                                    <span class="label-text-alt">Order that this team member should display in</span>
                                </label>
                                <input type="number" name="order" placeholder="0"
                                       class="input input-bordered w-full" value="{member.order}"
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
                            <input type="hidden" name="id" value="{member.id}"/>
                        </form>

                        <label for="edit-modal-{member.id}">
                            <button type="submit" form="edit-form-{member.id}" class="btn btn-primary">Edit
                            </button>
                        </label>
                        <label for="edit-modal-{member.id}" class="btn btn-secondary">Cancel</label>
                    </div>
                </div>

                <!--                Deletion handler-->
                <!--                Modal to confirm whether user wants to delete item -->
                <input type="checkbox" id="delete-confirm-modal-{member.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <p>Are you sure you want to delete this team member "{member.name}"?</p>
                        <div class="modal-buttons">
                            <label for="delete-confirm-modal-{member.id}">
                                <button type="submit" form="delete-form-{member.id}" class="btn btn-primary">Yes
                                </button>
                            </label>
                            <label for="delete-confirm-modal-{member.id}" class="btn btn-error">No</label>
                        </div>
                    </div>
                </div>
                <!--                Form to store deletion data -->
                <form action="?/delete" method="post" id="delete-form-{member.id}">
                    <input type="hidden" name="id" value="{member.id}"/>
                    <!--                    We need to pass through the image path to the deletion handler, to handle deleting the image -->
                    <input type="hidden" name="image" value="{member.image}"/>
                </form>

            {/each}
            </tbody>
        </table>
    </div>
</div>