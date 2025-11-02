import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function PostJob(){
  const nav = useNavigate();
  const [form,setForm] = useState({ title:'', description:'', location:'', salary:'', lastDate:''});
  const [busy,setBusy] = useState(false);

  const change = e => setForm({...form,[e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await API.post("/jobs", form);
      nav("/company");
    } catch(e){
      alert(e.response?.data?.message || "Failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
        <form onSubmit={submit} className="space-y-3">
          <input name="title" onChange={change} className="input px-4 py-3 rounded-md w-full" placeholder="Title" required />
          <textarea name="description" onChange={change} className="input px-4 py-3 rounded-md w-full" placeholder="Description" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="location" onChange={change} className="input px-4 py-3 rounded-md w-full" placeholder="Location" />
            <input name="salary" onChange={change} className="input px-4 py-3 rounded-md w-full" placeholder="Salary" />
          </div>
          <input name="lastDate" onChange={change} type="date" className="input px-4 py-3 rounded-md w-full" />
          <div className="pt-2">
            <button disabled={busy} className="bg-primary-500 px-4 py-2 rounded-md text-white">{busy? "Posting...":"Post Job"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
