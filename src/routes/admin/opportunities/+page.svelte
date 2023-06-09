<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {formatInTimeZone} from "date-fns-tz";
    import {format, parseISO} from "date-fns";

    export let form;

    export let data;
</script>

<PageHeader title="Manage Opportunities" subtitle="Create/read/update/delete opportunities on this site"/>

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
        <!--    "Create new opportunity" button -->
        <label for="create-modal" class="btn btn-primary">Create new opportunity</label>
    </div>

    <!--    Create new opportunity modal -->
    <input type="checkbox" id="create-modal" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box space-y-4">
            <form class="flex flex-col space-y-4" id="create-form" action="?/create" method="post">
                <!--                Title -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Title</span>
                        <span class="label-text-alt">A title for this opportunity</span>
                    </label>
                    <input type="text" name="title" placeholder="Type here" class="input input-bordered w-full"
                           required/>
                </div>
                <!--                Description -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Description</span>
                        <span class="label-text-alt">A description for this opportunity</span>
                    </label>
                    <input type="text" name="description" placeholder="Type here" class="input input-bordered w-full"
                           required/>
                </div>

                <!--                URL -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">URL</span>
                        <span class="label-text-alt">The link to this opportunity</span>
                    </label>
                    <input type="url" name="url" placeholder="https://iteusc.com/..."
                           class="input input-bordered w-full"
                           required/>
                </div>

                <!--                Deadline -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Deadline</span>
                        <span class="label-text-alt">When this opportunity is due</span>
                    </label>
                    <input type="date" name="deadline"
                           class="input input-bordered w-full"
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
                <th>Name</th>
                <th>Description</th>
                <th>URL</th>
                <th>Deadline</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each data.opportunities as opportunity}
                <!--Table entry-->
                <tr>
                    <td>{opportunity.name}</td>
                    <td>{opportunity.description}</td>
                    <td>
                        <div class="tooltip" data-tip="{opportunity.url}">
                            <a class="btn btn-circle btn-sm" href="{opportunity.url}" target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                    <path fill-rule="evenodd"
                                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                            </a>
                        </div>
                    </td>
                    <td>{formatInTimeZone(parseISO(opportunity.deadline), "UTC", "P")}</td>
                    <td>
                        <!--                        Show checkmark if published, x if not-->
                        {#if opportunity.published === true}
                            ✔
                        {:else}
                            ❌
                        {/if}
                    </td>
                    <td>{format(parseISO(opportunity.createdAt), "Pp")}</td>
                    <td>{format(parseISO(opportunity.updatedAt), "Pp")}</td>
                    <td>
                        <!--                        Buttons to trigger the edit/delete modals -->
                        <label for="edit-modal-{opportunity.id}" class="btn btn-sm btn-primary">
                            Edit
                        </label>
                        <label for="delete-confirm-modal-{opportunity.id}" class="btn btn-sm btn-error">
                            Delete
                        </label>
                    </td>
                </tr>

                <!--                Editing handler-->
                <!--                Modal to edit item -->
                <input type="checkbox" id="edit-modal-{opportunity.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <form class="flex flex-col space-y-4" id="edit-form-{opportunity.id}" action="?/edit"
                              method="post">
                            <!--                Title -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Title</span>
                                    <span class="label-text-alt">A title for this opportunity</span>
                                </label>
                                <input type="text" name="title" value="{opportunity.name}"
                                       class="input input-bordered w-full" required/>
                            </div>
                            <!--                Description -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Description</span>
                                    <span class="label-text-alt">A description for this opportunity</span>
                                </label>
                                <input type="text" name="description" value="{opportunity.description}"
                                       class="input input-bordered w-full" required/>
                            </div>

                            <!--                URL -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">URL</span>
                                    <span class="label-text-alt">The link to this opportunity</span>
                                </label>
                                <input type="url" name="url" placeholder="https://iteusc.com/..."
                                       class="input input-bordered w-full"
                                       value="{opportunity.url}"
                                       required/>
                            </div>

                            <!--                Deadline -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text">Deadline</span>
                                    <span class="label-text-alt">When this opportunity is due</span>
                                </label>
                                <!--                                The new Date() jankiness formats the date as an ISO 3339 string (required by <input>) -->
                                <input type="date" name="deadline"
                                       class="input input-bordered w-full"
                                       value="{new Date(opportunity.deadline).toISOString().split('T')[0]}"
                                       required/>
                            </div>

                            <!--                Published? -->
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Published?</span>
                                    <input type="checkbox" class="toggle" name="published" value="true"
                                           bind:checked="{opportunity.published}"/>
                                </label>
                            </div>

                            <!--                            Hidden input to store the item ID -->
                            <input type="hidden" name="id" value="{opportunity.id}"/>
                        </form>

                        <label for="edit-modal-{opportunity.id}">
                            <button type="submit" form="edit-form-{opportunity.id}" class="btn btn-primary">Edit
                            </button>
                        </label>
                        <label for="edit-modal-{opportunity.id}" class="btn btn-secondary">Cancel</label>
                    </div>
                </div>

                <!--                Deletion handler-->
                <!--                Modal to confirm whether user wants to delete item -->
                <input type="checkbox" id="delete-confirm-modal-{opportunity.id}" class="modal-toggle"/>
                <div class="modal">
                    <div class="modal-box space-y-4">
                        <p>Are you sure you want to delete this opportunity "{opportunity.name}"?</p>
                        <div class="modal-buttons">
                            <label for="delete-confirm-modal-{opportunity.id}">
                                <button type="submit" form="delete-form-{opportunity.id}" class="btn btn-primary">Yes
                                </button>
                            </label>
                            <label for="delete-confirm-modal-{opportunity.id}" class="btn btn-error">No</label>
                        </div>
                    </div>
                </div>
                <!--                Form to store deletion data -->
                <form action="?/delete" method="post" id="delete-form-{opportunity.id}">
                    <input type="hidden" name="id" value="{opportunity.id}"/>
                </form>

            {/each}
            </tbody>
        </table>
    </div>
</div>