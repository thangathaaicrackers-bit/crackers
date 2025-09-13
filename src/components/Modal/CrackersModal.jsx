import React from 'react'

export default function CrackersModal() {
    return (
        <>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add crackers</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Crackers</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Name:</label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>

                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Price:</label>
                                    <input type="number" class="form-control" id="recipient-name" />
                                </div>

                                <div class="mb-3">
                                    <label for="formFileMultiple" class="form-label">Choose image</label>
                                    <input class="form-control" type="file" id="formFileMultiple" multiple />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
