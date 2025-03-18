import { Lucid } from "lucid-cardano";

export enum CardanoWalletType {
    None = "None",
    Nami = "Nami",
    Eternl = "Eternl",
    Flint = "Flint",
    Gero = "Gero",
    Typhon = "Typhon",
    NuFi = "Nufi",
    Lace = "Lace",
    Vespr = "Vespr",
    Begin = "Begin",
    Yoroi = "Yoroi",
}

export async function connectCardanoWallet(wallet:any){
    const cardano: any = window.cardano
    if (!cardano) {
        return {error: "No wallet found in this browser. You must have a Cardano Wallet Extension (such as Nami) to connect."}
    }
    if (wallet === CardanoWalletType.None) {
        return {error : "Please select which Cardano browser wallet you want to connect."}
    }
    const walletAddress = await setCardanoWallet(cardano, wallet)
    if (!walletAddress) {
        return {error: `Failed to connect wallet. Make sure to grant access and make sure the ${wallet} wallet exists in your browser.`}
    }
    // const correctNetwork = isCorrectNetwork()
    // if (!correctNetwork) {
    //     return {error: "Error: Incorrect Network."}
    // }
    return {walletAddress}
}

// export function disconnect() {
//     const cardano: any = window.cardano;
//     if (!cardano) return false;

//     setLucid(undefined)
//     setWallet({ walletType: null, address: null } as any)
// }

// export async function signData(data: string) {
//     try {
//         if (!lucid) return null
//         const address = await lucid?.wallet?.address()
//         const { fromText } = await import("lucid-cardano")
//         const messageToSign = fromText(data)
//         const signedMessage = await lucid?.wallet?.signMessage(address,messageToSign)
//         return signedMessage
//     } catch (error) {
//         console.error(error);
//         throw new Error("Sign Data Error");
//     }
// }

export function getWalletAPI(cardanoWindow: any, walletType: CardanoWalletType) {
    // Prevent errors when there are no Cardano wallets
    if (!cardanoWindow) {
      return null;
    }

    // If Vespr has been detected, only show Vespr
    if (cardanoWindow && cardanoWindow.vespr) {
      return walletType === CardanoWalletType.Vespr
        ? cardanoWindow.vespr
        : null;
    }
    ``;
    if (walletType === CardanoWalletType.None) {
      return null;
    } else if (walletType === CardanoWalletType.Nami) {
      return cardanoWindow.nami;
    } else if (walletType === CardanoWalletType.Eternl) {
      return cardanoWindow.eternl;
    } else if (walletType === CardanoWalletType.Lace) {
      return cardanoWindow.lace;
    } else if (walletType === CardanoWalletType.Flint) {
      return cardanoWindow.flint;
    } else if (walletType === CardanoWalletType.Gero) {
      return cardanoWindow.gerowallet;
    } else if (walletType === CardanoWalletType.Typhon) {
      return cardanoWindow.typhoncip30;
    } else if (walletType === CardanoWalletType.NuFi) {
      return cardanoWindow.nufi;
    } else if (walletType === CardanoWalletType.Vespr) {
      return cardanoWindow.vespr;
    } else if (walletType === CardanoWalletType.Begin) {
      return cardanoWindow.begin;
    } else if (walletType === CardanoWalletType.Yoroi) {
      return cardanoWindow.yoroi;
    }

    return null;
}

async function setCardanoWallet(cardano: any, wallet: CardanoWalletType) {
    try {
      const api = await getWalletAPI(cardano, wallet).enable();
      if (!api) return false;

      const networkId = await getNetworkId(api);
      const network = networkId === 1 ? "Mainnet" : "Preprod";
      
      const lucid = await Lucid.new(undefined, network);
      lucid.selectWallet(api);
      const address = await lucid?.wallet.address();
      console.log("wallet address:", address)
    //   setWallet({ walletType: wallet, address } as any);
      return address;
    } catch (error) {
      return false;
    }
}

async function getNetworkId(api: any) {
    if (!api) return null;

    const networkId = await api.getNetworkId();
    return networkId;
}