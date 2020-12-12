# faclip

This is The clipboard tool to convert from type definition to mock data.
powered by [intermock](https://github.com/google/intermock).

### usage

For example, copy the type definition as shown below. Make sure your clipboard contains this type definition string.
A type definition called Props is the entry point for this tool.

```typescript
interface Area {
  name: string;
  label: string;
}
interface Props {
  firstName: string;
  lastName: string;
  user: string;
  emailAddress: string;
  phoneNumber: number;
  area: Area[];
}
```

Then run npm start. The contents of your clipboard have been changed to Stub data. After that, paste this data and use it.

```typescript
export const stub: Props = {
  firstName: "Anya",
  lastName: "Bartoletti",
  user:
    "Fuga assumenda eius et autem voluptatem. Non laudantium ex laborum autem. Earum ea atque aliquid aut similique et quo vero inventore. Ut explicabo est. Et molestiae quibusdam quis.\n \rDolores nesciunt ea blanditiis dolore. Ratione ducimus pariatur porro ad nam est. Natus voluptatibus nulla illum et. Aspernatur ratione ut nam laudantium ab quaerat ad nisi.\n \rMolestiae suscipit asperiores qui consectetur ex minima. Quidem molestias non perspiciatis harum non earum. Et doloribus quia quos debitis vel quo. Eos saepe dolore laborum dicta totam doloremque hic pariatur.",
  emailAddress: "Roger_Hermiston72@yahoo.com",
  phoneNumber: 47027,
  area: [
    {
      name: "Ms. Christopher Jaskolski",
      label:
        "Quaerat et numquam atque ex distinctio nostrum. Sequi ipsa quod. Hic quis quas libero voluptatibus voluptatem quo. Eos quia et et error esse alias soluta voluptas cumque.",
    },
    {
      name: "Christiana MacGyver",
      label: "Consequuntur earum autem alias a id totam hic aperiam eos.",
    },
    { name: "Toy Pagac", label: "nostrum assumenda qui" },
    {
      name: "Howard Koch",
      label:
        "Necessitatibus non nihil dignissimos ab et harum quibusdam.\nMinus aliquid debitis vel quas.\nBeatae voluptates ex error non ut molestiae exercitationem.",
    },
  ],
};
```
