IMAGE_NAME ?= lisu-official-site-preview
CONTAINER_NAME ?= lisu-official-site-preview
HOST_PORT ?= 3199
CONTAINER_PORT ?= 3000
DOCKER ?= docker

.PHONY: preview-build preview-up preview-down preview-logs preview-ps preview-rebuild

preview-build:
	$(DOCKER) build -t $(IMAGE_NAME) .

preview-up: preview-build
	-$(DOCKER) rm -f $(CONTAINER_NAME)
	$(DOCKER) run -d \
		--name $(CONTAINER_NAME) \
		--restart unless-stopped \
		-p $(HOST_PORT):$(CONTAINER_PORT) \
		$(IMAGE_NAME)
	@printf "Preview URL: http://localhost:%s\n" "$(HOST_PORT)"

preview-down:
	-$(DOCKER) rm -f $(CONTAINER_NAME)

preview-logs:
	$(DOCKER) logs -f $(CONTAINER_NAME)

preview-ps:
	$(DOCKER) ps --filter "name=$(CONTAINER_NAME)"

preview-rebuild:
	$(DOCKER) build --no-cache -t $(IMAGE_NAME) .
	-$(DOCKER) rm -f $(CONTAINER_NAME)
	$(DOCKER) run -d \
		--name $(CONTAINER_NAME) \
		--restart unless-stopped \
		-p $(HOST_PORT):$(CONTAINER_PORT) \
		$(IMAGE_NAME)
	@printf "Preview URL: http://localhost:%s\n" "$(HOST_PORT)"
