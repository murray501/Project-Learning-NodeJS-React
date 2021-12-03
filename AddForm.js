import { useInput } from "./hooks";

export default function AddForm({ onNewName = f => f }) {
    const [Props, reset] = useInput("");

    const submit = e => {
        e.preventDefault();
        fetch('/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: Props.value})
        })
        .then(async res => res.ok ? onNewName(await res.text()) : alert(await res.text()))
        reset("")
    };

    return(
        <form onSubmit={submit}>
            <input 
                {...Props}
                type="text" 
                placeholder="enter name..." 
                required 
            />
            <button>ADD</button> 
        </form>
    );
}