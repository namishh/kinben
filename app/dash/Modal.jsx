import React, { useState, useEffect } from 'react';
import { useLinksContext } from '../context/LinksContext';
const Modal = () => {
  const { edit, showModal, setEdit, setShowModal, updateLink } = useLinksContext()
  return (showModal && <div className="modal opacity-100 visible pointer-events-auto">
    <div className="modal-box  bg-neutral">
      <h3 className="font-bold text-xl mb-4">Modiy Links</h3>
      <form autoFocus={false}>
        <div className="flex gap-4 flex-col">
          <input
            className="input input-bordered input-md w-full"
            value={edit.name}
            placeholder="Enter name here"
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
          />
          <input
            className="input input-bordered input-md w-full"
            value={edit.url}
            placeholder="Enter URL here (with https://)"
            onChange={(e) => setEdit({ ...edit, url: e.target.value })}
          />
        </div>
      </form>
      <div className="modal-action">
        <form method="dialog">
          <button onClick={() => { updateLink(); setShowModal(false) }} className="btn bg-[#1f1f1f]">Save</button>
        </form>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={() => { updateLink(); setShowModal(false) }}>close</button>
    </form>

  </div>
  )
}

export default Modal
