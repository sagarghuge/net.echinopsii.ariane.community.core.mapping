
MATCH startContainer-[:owns]->startContainerContainerPrimaryAdminGate
WHERE
startContainer.MappingGraphVertexType = "container" AND
startContainerContainerPrimaryAdminGate.MappingGraphVertexID = startContainer.containerPrimaryAdminGate AND
(startContainerContainerPrimaryAdminGate.nodeName =~ ".*tibrvrdl03prd01.*")
WITH startContainer

MATCH endContainer-[:owns]->endContainerContainerPrimaryAdminGate
WHERE
endContainer.MappingGraphVertexType = "container" AND
endContainerContainerPrimaryAdminGate.MappingGraphVertexID = endContainer.containerPrimaryAdminGate AND
(endContainerContainerPrimaryAdminGate.nodeName =~ ".*tibrvrdl05prd01.*")
WITH startContainer, endContainer

MATCH path = startContainer -[:owns|link*]- endContainer
WHERE
ALL(n in nodes(path) where 1=length(filter(m in nodes(path) WHERE m=n)))
RETURN DISTINCT
EXTRACT(co in FILTER( n in nodes(path) WHERE n.MappingGraphVertexType = "container")| co.MappingGraphVertexID) as CID,
EXTRACT(no in FILTER( n in nodes(path) WHERE n.MappingGraphVertexType = "node")| no.MappingGraphVertexID) as NID,
EXTRACT(e in FILTER( n in nodes(path) WHERE n.MappingGraphVertexType = "endpoint")| e.MappingGraphVertexID) as EID,
EXTRACT(t in FILTER( n in nodes(path) WHERE n.MappingGraphVertexType = "transport")| t.MappingGraphVertexID) as TID,
EXTRACT(l in FILTER( r in relationships(path) WHERE type(r) = "link")| l.MappingGraphEdgeID) as LID;