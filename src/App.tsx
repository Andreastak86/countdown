import Counter from "./components/Counter";
import "./App.css";

type Person = {
    name: string;
    title: string;
    extra?: string;
    month: number;
    day: number;
};

const bursdagsBarn: Person[] = [
    { name: "Elvira", month: 1, day: 18, title: "Søte" },
    { name: "Oskar", month: 3, day: 23, title: "Tøffe" },
    { name: "Tobias", month: 3, day: 29, title: "Morsomme" },
    {
        name: "Amalie",
        month: 7,
        day: 7,
        title: "Gode",
        extra: "Og da skal vi ut å kjøre bil!",
    },
];

export default function App() {
    return (
        <main>
            {bursdagsBarn.map((person) => (
                <div key={person.name} id={person.name} className='person_card'>
                    <p>
                        {person.title}: <br />{" "}
                        <span className='name'>{person.name}</span>
                    </p>

                    <h4>Du vet du har bursdag om:</h4>

                    <Counter
                        label={person.name}
                        targetDate={
                            new Date(2026, person.month, person.day, 0, 0, 0)
                        }
                    />
                    {person.extra && (
                        <p className='extra_text'>{person.extra}</p>
                    )}
                </div>
            ))}
        </main>
    );
}
