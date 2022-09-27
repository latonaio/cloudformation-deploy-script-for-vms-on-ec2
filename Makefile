####### export argument #######
test:
	echo "environment is $(environment)"
	echo "stackTemplatePath is $(stackTemplatePath)"
	echo "targetStackTemplate is $(targetStackTemplate)"
	echo "profile is $(profile)"
	echo "region is $(region)"

####### deploy #######
deploy:
	npx ts-node deploy.ts \
	-e $(environment) \
	--profile $(profile) \
	--region $(region) \
	-s $(stackTemplatePath) \
	-p $(parameterTarget) \
	-t $(targetStackTemplate)

deploy-cloudformation:
	aws cloudformation deploy \
		--stack-name $(stackName) \
		--template-file $(targetStackTemplatePath) \
		--parameter-overrides \
		 $(params) \
		--capabilities CAPABILITY_NAMED_IAM \
		--profile $(profile) \
		--region $(region)

