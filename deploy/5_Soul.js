module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()

    await deploy("SoulToken", {
        from: deployer,
        log: true,
        deterministicDeployment: false
    })

    await deploy("Drachma", {
        from: deployer,
        log: true,
        deterministicDeployment: false
    })

}

module.exports.tags = ["SoulToken", "Drachma"]
module.exports.dependencies = []