import Layout from '../components/Layout';

let commandlist = [
    {
        name: "d",
        structure: "d <max>|d <min> <max>",
        desc: "Output a Random Number",
        example: "d 5|d 2 9"
    },
    {
        name: "key",
        structure: "demon <place or name>",
        desc: "Find Value of Amount of keys inputted",
        example: "key 3 THB"
    }
]

const List = () => {
    return(
    <div>
        <table>
        <tr>
            <th>Command</th>
            <th>Structure</th>
            <th>Description</th>
            <th>Example</th>
        </tr>
        {commandlist.map(cmd => (
            <tr key={cmd.name}>
                <th>{cmd.name}</th>
                <th>{cmd.structure}</th>
                <th>{cmd.desc}</th>
                <th>{cmd.example}</th>
            </tr>
        ))}
        </table>
    </div>
    )
}

const Page = () => (
    <Layout>
        <List/>
    </Layout>
);

export default Page;
