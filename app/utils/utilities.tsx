export const nodeList = [
  {
    name: "Hodor",
    chain: "Klever",
    ip: "http://192.168.0.13:8080/node/status",
  },
  {
    name: "Eddard Stark",
    chain: "Klever",
    ip: "http://192.168.0.14:8080/node/status",
  },
  {
    name: "Jon Snow",
    chain: "Klever",
    ip: "http://192.168.3.201:8080/node/status",
  },
  {
    name: "Arya Stark",
    chain: "Klever",
    ip: "http://192.168.3.203:8080/node/status",
  },
  {
    name: "Bran Stark",
    chain: "Klever",
    ip: "http://192.168.3.202:8080/node/status",
  },
  // { name: "PreSearch Home", ip: "192.168.0.15:9090" },
]

export const determineColorPercent = (num: number) => {
  if (num > 75) {
    return "red"
  } else if (num >= 50) {
    return "orange"
  } else if (num < 50) {
    return "green"
  } else {
    return "yellow"
  }
}

export const determineColor = (num: number) => {
  if (num > 2) {
    return "red"
  } else if (num === 2) {
    return "yellow"
  } else if (num === 1) {
    return "yellow"
  } else if (num < 1) {
    return "green"
  } else {
    return "blue"
  }
}

export const determineColorByComplexity = (
  complexity?: "easy" | "medium" | "hard",
  hardware?: "light" | "moderate" | "significant"
) => {
  if (complexity === "easy" || hardware === "light") {
    return "green"
  } else if (complexity === "medium" || hardware === "moderate") {
    return "orange"
  } else if (complexity === "hard" || hardware === "significant") {
    return "red"
  } else {
    return "yellow"
  }
}

export const determineColorByHardware = (
  hardware: "light" | "moderate" | "significant"
) => {
  if (hardware === "light") {
    return "green"
  } else if (hardware === "moderate") {
    return "orange"
  } else if (hardware === "significant") {
    return "red"
  } else {
    return "yellow"
  }
}

export const determineColorPeerType = (str: string) => {
  if (str === "observer") {
    return "blue"
  } else if (str === "eligible") {
    return "yellow"
  } else if (str === "elected") {
    return "green"
  } else if (str === "jailed") {
    return "red"
  } else if (str === "inactive") {
    return "red"
  } else if (str === "waiting") {
    return "red"
  } else {
    return "yellow"
  }
}

export const kleverOrder = (name: string) => {
  if (name === "Hodor") {
    return 1
  }
  if (name === "Eddard Stark") {
    return 2
  }
  if (name === "Jon Snow") {
    return 3
  }
  if (name === "Arya Stark") {
    return 4
  }
  if (name === "Bran Stark") {
    return 5
  }
}
